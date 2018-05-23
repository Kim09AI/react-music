const DllPlugin = require('webpack/lib/DllPlugin')
const path = require('path')

module.exports = (env = {}) => {
    const anuDll = env.ANU_DLL
    const dllArr = anuDll ? ['anujs'] : ['react', 'react-dom']

    return {
        entry: {
            base: dllArr.concat([
                'react-router-dom',
                'redux',
                'react-redux',
                'redux-thunk',
                'fastclick',
                'axios',
                'react-swipe',
                'react-motion',
                'react-hammerjs',
            ])
        },
        resolve: {
            alias: anuDll ? { 'react': 'anujs', 'react-dom': 'anujs' } : {}
        },
        output: {
            filename: '[name].dll.js',
            path: path.resolve(__dirname, '../public'),
            library: '_dll_[name]',
        },
        plugins: [
            new DllPlugin({
                name: '_dll_[name]',
                path: path.resolve(__dirname, '../public', '[name].manifest.json'),
            }),
        ],
    }
}