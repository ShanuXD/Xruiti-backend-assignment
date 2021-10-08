const { Router } = require("express");
const router = Router();
const User = require("../models/user");
const Order = require("../models/order");

// Adiing new user
router.post("/adduser", async (req, res) => {
  const { name } = req.body;
  try {
    const users = await User.find();
    const userId = users.length === 0 ? 1 : users.length + 1;

    const newUser = new User({ userId, name });
    await newUser.save();

    res.json({
      success: true,
      message: "new User Added!",
    });
  } catch (err) {
    res.json({
      success: false,
      message: `Error occured:${err}`,
    });
  }
});

// For adding orders
router.post("/addorder", async (req, res) => {
  const { userId, subTotal } = req.body;

  try {
    const orders = await Order.find();
    const orderId = orders.length === 0 ? 1 : orders.length + 1;
    const date = new Date();

    const usersArray = await User.find({ userId: userId });
    const user = usersArray[0];
    user.numberOfOrders = user.numberOfOrders + 1;
    await user.save();

    const order = { orderId, userId, subTotal, date };
    const newOrder = await new Order(order);
    await newOrder.save();

    res.json({
      success: true,
      message: "order saved!",
    });
  } catch (err) {
    res.json({
      success: false,
      message: `Error occured:${err}`,
    });
  }
});

// Get all user purchase details
router.get("/getdetails", async (req, res) => {
  const orders = await Order.find({});
  const users = await User.find({});

  const result = getData(orders, users)
  res.json( result );
});

module.exports = router;

function getData(orders, users) {
  const userData = {};

  for (let user of users) {
    const { userId, name, numberOfOrders } = user;
    if (!userData[userId]) {
      let totalAmount = 0;
      userData[userId] = { name, userId, numberOfOrders, totalAmount };
    }
  }

  for (let order of orders) {
    const { date, userId, subTotal } = order;
    if (userData[userId]) {
      console.log(userData[userId]["totalAmount"]);
      userData[userId]["totalAmount"] += subTotal;
    }
  }

  const resultList = [];
  for (let id in userData) {
    const { numberOfOrders, totalAmount, name, userId } = userData[id];
    const averageBillValue = Math.floor(
      Math.round(totalAmount / numberOfOrders)
    );
    const data = {
      name,
      userId,
      numberOfOrders,
      averageBillValue,
    };
    resultList.push(data);
  }

  console.log(resultList);
  return resultList
}
