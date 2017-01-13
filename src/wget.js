/**
 * DevCom `wget` command
 * @class
 * 
 * Download a web file
 */
class Wget extends lib.DevCom {

    get name() {
        return 'wget';
    }

    get shortDoc() {
        return 'Download a web files';
    }

    /**
     * Run the `wget` built-in devcom
     * 
     * @param {object} devTool - Instance of DevToolCommandLine
     * @param {object} options - Options for argument list
     */
    run(devTool, options) {
        if (options.args.length !== 2) {
            usage();
            devTool.exitCode = 1;
            return;
        }

        let url = _url.parse(options.args[0]),
            path = _path.resolve(options.args[1]);

        if (!url.protocol) {
            /** @todo: Use printf() + devTool.exitCode */
            throw createError('Invalid URL: ' + options.args[0]);
        }

        lib.download(url.href, path, options);
    }

    help() {
        /** @todo: Show a devTool header default */
        lib.printf('DEVCOM ' + this.name + ' ' + this.shortDoc);
        lib.printf();

        this.usage();

        let lines = [
            '',
            '  url           URL of the web file',
            '  path          Path to save web file local',
            '',
            'Options:',
            '  -quiet        No print messages',
            '  --timeout [t] Set timeout in seconds'
        ];

        lib.printf(lines.join(_os.EOL));
    }

    usage() {
        lib.printf('usage: ' + devTool.name + ' ' + this.name + ' [url] [path] [options]');
    }
}
