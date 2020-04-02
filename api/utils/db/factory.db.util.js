const connectorName = process.env.CONNECTOR_NAME || 'mongo';

const getConnector = () => {
    const connector = require(`./connectors/${connectorName}.connector`);
    return connector.getConnector();
};

const init = () => {
    return getConnector();
};

exports.init = init;
