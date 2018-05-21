const DllPlugin = require('webpack/lib/DllPlugin')
const path = require('path')

module.exports = {
    entry: {
        vender: [
            'react',
            'react-dom',
            'react-router-dom',
            'redux',
            'react-redux',
            'redux-thunk',
            'fastclick',
            'axios',
            'anujs',
            'react-swipe',
            'react-motion',
            'react-hammerjs',
        ]
    },
    output: {
        filename: '[name].dll.js',
        path: path.resolve(__dirname, '../config/dist-dll'),
        library: '_dll_[name]',
    },
    plugins: [
        new DllPlugin({
            name: '_dll_[name]',
            path: path.resolve(__dirname, '../config/dist-dll', '[name].manifest.json'),
        }),
    ],
}