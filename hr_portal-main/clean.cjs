const fs = require('fs');
const path = require('path');
function cleanDir(dir) {
    if(!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for(const file of files) {
        const fullPath = path.join(dir, file);
        if(fs.statSync(fullPath).isDirectory()) {
            cleanDir(fullPath);
        } else if(fullPath.endsWith('.js')) {
            const jsxPath = fullPath.replace(/\.js$/, '.jsx');
            if(fs.existsSync(jsxPath)) {
                fs.unlinkSync(fullPath);
                console.log('Deleted', fullPath);
            }
        }
    }
}
cleanDir(path.join(__dirname, 'src', 'pages'));
cleanDir(path.join(__dirname, 'src', 'components'));
cleanDir(path.join(__dirname, 'src', 'context'));
cleanDir(path.join(__dirname, 'src', 'hooks'));
