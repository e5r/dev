/* DEVCODE-BEGIN */
(async () => {
    "use strict";

    var devUtil = require('../scripts/devutils');

    devUtil
        .ensureNode()
        .requireGlobal([
            'global-consts',
            'global-extensions',
            'global-functions',
            'global-vars'
        ]);
    /* DEVCODE-END */

    /**
     * Devcom `setup` command
     * @class
     * 
     * Setup the E5R Development Tool on the user home
     */
    class Setup extends lib.DevCom {

        get name() {
            return 'setup';
        }

        get shortDoc() {
            return 'Setup a E5R Development Team Environment';
        }

        /**
         * Run the `setup` built-in command
         * 
         * @param {object} devTool - Instance of DevToolCommandLine
         * @param {object} options - Options for argument list
         */
        run(devTool, options) {
            lib.printf('Set-up E5R Tools for Development Team...');

            // 1> Make directory structure
            [
                lib.devHome.root,
                lib.devHome.tools,
                lib.devHome.bin,
                lib.devHome.lib,
                lib.devHome.cmd,
                lib.devHome.doc
            ].map(path => {
                lib.logger.debug('mkdir:', path);
                lib.mkdir(path);
            });

            // 2> Download `registry.json`
            lib.logger.debug(
                'downloadSync:',
                _url.resolve(TOOL_DEFAULT_REGISTRY_URL, TOOL_REGISTRY_FILE),
                _path.resolve(lib.devHome.root, TOOL_REGISTRY_FILE)
            );

            lib.downloadSync(
                _url.resolve(TOOL_DEFAULT_REGISTRY_URL, TOOL_REGISTRY_FILE),
                _path.resolve(lib.devHome.root, TOOL_REGISTRY_FILE)
            );

            // 3> Add /bin to PATH
            /** @todo: Ver o uso de arquivo *.CMD & *.PS1 para propagação de %PATH%. */
            /** @todo: Ver FLAG de tipo de sessão (PS1, CMD, SH) */
            lib.logger.debug('addPathToEnvironmentPath:', lib.devHome.bin);
            lib.addPathToEnvironmentPath(lib.devHome.bin, devTool);

            // 4> InstalL binary
            lib.logger.debug('Loading DEVCOM registry...');
            let registry = lib.require('cmd://registry');

            lib.logger.debug('Calling DEVCOM registry get-binaries...');
            registry.run(devTool, parseArgOptions([
                'get-binaries'
            ]));

            // 5> Show completed info
            lib.printf('Set-up completed!');
        }
    }

    /* DEVCODE-BEGIN */
    module.exports.Setup = Setup;

    if (!module.parent && module.filename === __filename && process.argv.indexOf('-devmode') >= 0) {
    }

})();
/* DEVCODE-END */