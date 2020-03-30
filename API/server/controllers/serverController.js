var OpenNebula = require('opennebula');
var one = new OpenNebula('oneadmin:xylah', 'http://192.168.40.131:2633/RPC2');

async function findVM(vmID) {
    if(vmID !== undefined) {
        var vm = one.getVM(vmID);
        return vm;
    }
    else {
        return false;
    }
}

exports.getVersion = async () => {
    await one.version(function(err, data) {
        res.status(200).json({
            data: data
        });
    });
};

exports.getInfos = async () => {
    const { vmID } = req.body;
    let vm = findVM(vmID);
    await vm.info(function (err, data) {
        res.status(200).json({
            success: "You server is restarting: " + data
        });
    if(err) {
        res.status(200).json({
            error: err
        });
    }
    });
};
exports.reboot = async () => {
        const { vmID } = req.body;
        let vm = findVM(vmID);
        if(vm !== false && vm !== undefined) {
        await vm.action('reboot', function(err, data) {
            res.status(200).json({
                success: "You server is restarting: " + data
            });
        };
        if(err) {
            res.status(200).json({
                error: err
            });
        }
    });
};
