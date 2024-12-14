import Order from "../../models/order.js";

async function allOrder() {
    try {
        const orders = await Order.findAll();
        const itemsOrder = []; 
        orders.forEach(order => {
            //console.log(user); 
            //console.log(user.dataValues.id); 
            itemsOrder.push(order); 
        });

        return itemsOrder; 
    } catch (error) {
        return `Error fetching oder: ${error}`;
    }
}

export default allOrder(); 