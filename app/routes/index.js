// tutorial.routes
module.exports = app => {
    require('./user_device.routes')(app);
    require('./user.routes')(app);
    require('./device_code.routes')(app);
};
