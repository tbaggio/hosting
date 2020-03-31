var OpenNebula = require('opennebula');
var one = new OpenNebula('oneadmin:mypassword', 'http://91.121.65.172:2633/RPC2');
const User = require('../models/userModel');

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

exports.getInfos = async (res, req, next) => {
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
exports.reboot = async (res, req, next) => {
        const { vmID } = req.body;
        let vm = findVM(vmID);
        if(vm !== false && vm !== undefined) {
            await vm.action('reboot', function(err, data) {
                res.status(200).json({
                    success: "You server is restarting",
                });
                if(err) {
                    res.status(200).json({
                     error: err
                    });
                }
            });
        };
};

exports.create = async (res, req, next) => {
    try {
        var template = one.getTemplate(9);
        console.log(template)
        one.createVM('AUTOMATIC_DS_REQUIREMENTS = "(\\"CLUSTERS/ID\\" @> 0)"\n' +
            'AUTOMATIC_NIC_REQUIREMENTS = "(\\"CLUSTERS/ID\\" @> 0)"\n' +
            'AUTOMATIC_REQUIREMENTS = "(CLUSTER_ID = 0) & !(PUBLIC_CLOUD = YES) & !(PIN_POLICY = PINNED)"\n' +
            'CONTEXT = [\n' +
            '  DISK_ID = "1",\n' +
            '  NETWORK = "YES",\n' +
            '  SSH_PUBLIC_KEY = "",\n' +
            '  TARGET = "hda" ]\n' +
            'CPU = "1"\n' +
            'DISK = [\n' +
            '  ALLOW_ORPHANS = "NO",\n' +
            '  CLONE = "YES",\n' +
            '  CLONE_TARGET = "SYSTEM",\n' +
            '  CLUSTER_ID = "0",\n' +
            '  DATASTORE = "default",\n' +
            '  DATASTORE_ID = "1",\n' +
            '  DEV_PREFIX = "vd",\n' +
            '  DISK_ID = "0",\n' +
            '  DISK_SNAPSHOT_TOTAL_SIZE = "0",\n' +
            '  DISK_TYPE = "FILE",\n' +
            '  DRIVER = "qcow2",\n' +
            '  IMAGE = "Debian 9",\n' +
            '  IMAGE_ID = "7",\n' +
            '  IMAGE_STATE = "2",\n' +
            '  LN_TARGET = "SYSTEM",\n' +
            '  ORIGINAL_SIZE = "2048",\n' +
            '  READONLY = "NO",\n' +
            '  SAVE = "NO",\n' +
            '  SIZE = "2048",\n' +
            '  SOURCE = "/var/lib/one//datastores/1/6be79337b51961938b6bcce083ada4db",\n' +
            '  TARGET = "vda",\n' +
            '  TM_MAD = "ssh",\n' +
            '  TYPE = "FILE" ]\n' +
            'GRAPHICS = [\n' +
            '  LISTEN = "0.0.0.0",\n' +
            '  PORT = "5928",\n' +
            '  TYPE = "vnc" ]\n' +
            'MEMORY = "768"\n' +
            'OS = [\n' +
            '  ARCH = "x86_64" ]\n' +
            'TEMPLATE_ID = "9"\n' +
            'TM_MAD_SYSTEM = "ssh"\n' +
            'VMID = "28"', false, function (err, vm) {
            if (!err) {
                User.findOneAndUpdate({_id:'5e8329e0c1790e06a2823463'}, {servers: {serverID: vm.id}}, function(err, result) {
                    if (err) {
                        console.log(err)
                    } else if (result) {
                        console.log(result)
                    }
                });
            }
        });
    }
    catch (error)
        {
            res.json({
                error: error,
            })
        }
};
