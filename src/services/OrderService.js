const Order = require("../models/OrderProduct")
const Product = require("../models/ProductModel")
const EmailService = require("./EmailService");

const createOrder = (newOrder) => {
    return new Promise(async (resolve, reject) => {
        const { orderItems, paymentMethod, itemsPrice, shippingPrice, totalPrice, fullName, address, city, phone, user, isPaid, paidAt, email, status } = newOrder;
        try {
            const promises = orderItems.map(async (order) => {
                const productData = await Product.findOneAndUpdate(
                    {
                        _id: order.product,
                        countInStock: { $gte: order.amount }
                    },
                    {
                        $inc: {
                            countInStock: -order.amount,
                            sold: +order.amount
                        }
                    },
                    { new: true }
                );
                if (productData) {
                    return {
                        status: 'OK',
                        message: 'SUCCESS'
                    };
                }
                else {
                    return {
                        status: 'ERR',
                        message: 'Product not available',
                        id: order.product
                    };
                }
            });
            const results = await Promise.all(promises);
            const newData = results.filter((item) => item.status === 'ERR');
            if (newData && newData.length) {
                const arrId = newData.map(item => item.id);
                resolve({
                    status: 'ERR',
                    message: `Product(s) with ID(s): ${arrId.join(', ')} are not available.`
                });
            } else {
                const createdOrder = await Order.create({
                    orderItems,
                    shippingAddress: {
                        fullName,
                        address,
                        city,
                        phone
                    },
                    paymentMethod,
                    itemsPrice,
                    shippingPrice,
                    totalPrice,
                    user,
                    isPaid,
                    paidAt,
                    status
                });
                if (createdOrder) {
                    await EmailService.sendEmailCreateOrder(email, orderItems)
                    resolve({
                        status: 'OK',
                        message: 'Order created successfully',
                    })
                }
            }
        } catch (e) {
            reject(e);
        }
    });
};

const getAllOrderDetails = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.find({
                user: id
            }).sort({createdAt: -1, updatedAt: -1})
            if (order === null) {
                resolve({
                    status: 'ERR',
                    message: 'The order is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: order
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getOrderDetails = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.findById({
                _id: id
            })
            if (order === null) {
                resolve({
                    status: 'ERR',
                    message: 'The order is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: order
            })
        } catch (e) {
            reject(e)
        }
    })
}

const updateStatusOrder = (id, status) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!["pending", "in-progress", "cancel", "completed", "refund"].includes(status)) {
                throw new Error("Invalid status");
            }

            const order = await Order.findByIdAndUpdate(
                id,
                { status: status },
                { new: true }
            );
        
            if (order === null) {
                resolve({
                    status: 'ERR',
                    message: 'The order is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: order
            })
        } catch (e) {
            reject(e)
        }
    })
}

const cancelOrderDetails = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let order;
            try {
                order = await Order.findByIdAndUpdate(
                    id,
                    { status: "cancel" },
                    { new: true }
                );
                if (!order) {
                    throw new Error('The order is not defined');
                }
            } catch (error) {
                reject({ status: 'ERR', message: 'An error occurred while updating the order' });
            }

            const promises = data.map(async (orderItem) => {
                try {
                    const productData = await Product.findOneAndUpdate(
                        {
                            _id: orderItem.product,
                            sold: { $gte: orderItem.amount }
                        },
                        {
                            $inc: {
                                countInStock: +orderItem.amount,
                                sold: -orderItem.amount
                            }
                        },
                        { new: true }
                    );
                    if (!productData) {
                        throw new Error(`Product with ID: ${orderItem.product} is not available`);
                    }
                } catch (error) {
                    return {
                        status: 'ERR',
                        message: error.message
                    };
                }
            });

            const results = await Promise.all(promises);
            const newData = results.find(item => item && item.status === 'ERR');

            if (newData) {
                resolve(newData);
            } else {
                resolve({
                    status: 'OK',
                    message: 'Order canceled successfully',
                    data: order
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};


const getAllOrder = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allOrder = await Order.find().sort({createdAt: -1, updatedAt: -1})
            resolve({
                status: 'OK',
                message: 'Success',
                data: allOrder
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createOrder,
    getAllOrderDetails,
    getOrderDetails,
    cancelOrderDetails,
    getAllOrder,
    updateStatusOrder
}


