const Ansible = require('node-ansible');
const path = require('path');
const ping = require('ping');

function findPlaybook(serviceName) {
    switch (serviceName) {
        case 'nodejs':
            return 'nodejs-playbook';
        case 'ng8':
            return 'angular8-playbook';
        case 'nginx':
            return 'nginx-playbook';
        default:
            return null;
    }
};

async function isValid(host, port) {
    hosts(function(host){
        ping.sys.probe(host, function(isAlive){
            return isAlive;
        });
    });
}

exports.deployService = async (req, res, next) => {
    try {
        const { serviceName, host } = req.body;
        let playbookName = findPlaybook(serviceName);
        if((playbookName !== null) && (isValid(host))) {
            let playbook = new Ansible.Playbook().playbook(playbookName);
            playbook.on('stdout', function (data) {
                res.status(200).json({
                    data: data.toString()
                });
            });
            playbook.on('stderr', function (data) {
                res.status(200).json({
                    data: data.toString() // jamais appelé y'a pas d'erreurs
                })
            });
            playbook.inventory(host);
            playbook.exec({cwd: path.join(__dirname, '/../../../Ansible/ansible')});
        } else {
            res.status(200).json({
                data: "Unknown service name"
            });
        }
    } catch (error) {
        next(error);
    }
};
