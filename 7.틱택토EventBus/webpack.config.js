//webpack 설정
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const path = require('path'); //노드에서 절대경로 적을 떄 힘든 걸 도와준다. node 가 만들어둔 스크립트

module.exports = {
    mode: 'development', //개발할 땐 development, 배포할 땐 production
    devtool: 'eval', //개발할 땐 eval 빠름, 배포할땐 hidden-source-map
    resolve: {
        extensions: ['.js', '.vue'] //확장자를 처리 , 여기다가 넣어주면 import 시 .js , .vue 없어도된다.
    },
    entry: {
        app: path.join(__dirname, 'main.js')//app : 하나로 합쳐질 하나의 이름
    },
    module: { //모듈이 웹팩의 핵심
        rules: [
            {  //합칠 때, js 파일을 합칠 때 어떻게 합칠건지 여기에 정의한다.
                test: /\.vue$/, //.vue 로 끝나는 파일
                use: 'vue-loader' //뷰로더를 사용하겠다. loader 라고 해도되고, use 라고 해도 된다.
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader', 'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
    ]
    ,
    output: {
        filename: '[name].js', // 'app.js'
        path: path.join(__dirname, 'dist'), //현재경로는 __dirname 으로 접근가능, 뒤에 dist 적어주면 알아서 경로를 합쳐줌
        publicPath : '/dist',
    },
    devServer: {
        port : 8084
    }

};