import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';
export const CODE = {
    MINE: -7,
    NORMAL: -1,
    QUESTION: -2,
    QUESTION_MINE: -4,
    FLAG: -3,
    FLAG_MINE: -5,
    CLICKED_MINE: -6,
    OPENED: 0 //0이상이면 다 opened
    //question , question_mine : 빈칸에 깃발 꽂은 경우 -> 다시 빈칸 / 지뢰에 깃발 꽂은 경우 -> 지뢰로 돌려줘야함
}
//지뢰심기
const plantMine = (row, cell, mine) => {
    console.log(row, cell, mine);
    const candidate = Array(row * cell).fill().map((arr, i) => {
        return i;
    });
    const shuffle = [];
    while (candidate.length > row * cell - mine) {
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
        shuffle.push(chosen);
    }
    const data = [];
    for (let i = 0; i < row; i++) {
        const rowData = [];
        data.push(rowData);
        for (let j = 0; j < cell; j++) {
            rowData.push(CODE.NORMAL);
        }
    }

    for (let k = 0; k < shuffle.length; k++) {
        const ver = Math.floor(shuffle[k] / cell);
        const hor = shuffle[k] % cell;
        data[ver][hor] = CODE.MINE;
    }

    console.log(data);
    return data;
};


export default new Vuex.Store({
    state: {
        tableData: [],
        data: {
            row: 0,
            cell: 0,
            mine: 0,

        },
        timer: 0,
        halted: true, //중단된 상태
        result: '',
        openedCount: 0, // 로우 * 셀 - 마인이랑 같아지면 승리하는 것.
    },
    getters: {},
    mutations: {
        [START_GAME](state, {row, cell, mine}) {
            state.data = {
                row,
                cell,
                mine
            }; //인풋값에 들어온 값을 클릭버튼으로 commit 해서 이쪽으로 데이터가 넘어옴
            console.log(row)
            state.tableData = plantMine(row, cell, mine); //지뢰 심는 함수
            state.timer = 0; //0으로 초기화
            state.halted = false; // timer시작!
            state.openedCount = 0;
            state.result = '';
        },
        [OPEN_CELL](state, {row, cell}) {
            let openedCount = 0;
            const checked = []; //메모이제이션, 캐싱?

            //주변지뢰갯수가 몇갠지 알려면 오픈셀에서 해주면 된다.
            //대각선...
            function checkAround(row,cell) { //주변 8칸 확인하기
                const checkRowOrCellIsUndefined = row < 0 || row >= state.tableData.length || cell < 0 || cell >= state.tableData[0].length;
                //언디파인드 방지 / 나중에 어떤 코드인 지 모르겠으면 변수로 저장해둬도된다. 길어도, 자세해도 된다.
                if (checkRowOrCellIsUndefined) {
                    return;
                }
                //주변칸이 빈칸인 경우만 검사해주기 위해서 이미 열렸거나, 지뢰거나일때는 리턴해버리기
                if ([CODE.OPENED, CODE.FLAG, CODE.FLAG_MINE, CODE.QUESTION_MINE, CODE.QUESTION].includes(state.tableData[row][cell])) {
                    return;
                }
                //이미 한 번 체크한 칸은 다시 열기 않기 !
                if (checked.includes(row + '/' + cell)) {
                    return; //한 번 연 칸이면 종료해버리고
                } else {
                    checked.push(row + '/' + cell);
                    //안 열었던 칸이면 checked 에 검사해서 push 해준다.
                }
                let around = [];
                if (state.tableData[row - 1]) {
                    around = around.concat([
                        state.tableData[row - 1][cell - 1], state.tableData[row - 1][cell], state.tableData[row - 1][cell + 1]
                    ])
                }
                around = around.concat([
                    state.tableData[row][cell - 1], state.tableData[row][cell + 1]
                ]);
                if (state.tableData[row + 1]) {
                    around = around.concat([
                        state.tableData[row + 1][cell - 1], state.tableData[row + 1][cell], state.tableData[row + 1][cell + 1]
                    ]);
                }
                const counted = around.filter(function (v) {
                    return [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v);
                });
                //row가 -1 보다 크다 => 보호연산 .. 넣어주어야한다.
                if (counted.length === 0 && row > -1) { // 주변칸에 지뢰가 하나도 없으면 주변칸을 열어줄거다.
                    //즉, 프로그래밍이 클릭을 대신해주어야한다.
                    //그 역할을 checkAround 가 해준다.
                    //밑에보면 그걸 내가 해주고 있다. ->재귀함수
                    //인수랑 매개변수는 조금씩 바뀔거다.
                    const near = [];
                    if (row - 1 > -1) {
                        near.push([row - 1, cell - 1]);
                        near.push([row - 1, cell]);
                        near.push([row - 1, cell + 1]);
                    }
                    near.push([row, cell - 1]);
                    near.push([row, cell + 1]);
                    if (row + 1 < state.tableData.length) {
                        near.push([row + 1, cell - 1]);
                        near.push([row + 1, cell]);
                        near.push([row + 1, cell + 1]);
                    }
                    near.forEach((n) => {
                        if (state.tableData[n[0]][n[1]] !== CODE.OPENED) {
                            checkAround(n[0], n[1]);
                        }
                    });
                }
                if (state.tableData[row][cell] === CODE.NORMAL) {
                    openedCount += 1;
                }
                //state.tableData[row][cell] = CODE.OPENED;
                //위와같이 하면 안된다. 배열에서 인덱스로 접근할 때에는 화면이 바뀌지 않기 때문에 Vue.set을 써야함.
                Vue.set(state.tableData[row], cell, counted.length); //count: 주변지뢰갯수를 넣어준다.
            }

            checkAround(row, cell); //자기부르고 부르고 그런 형식인데, 아무도 안 불러주고 있기 때문에 호출한다.
            let halted = false;
            let result = '';
            if (state.data.row * state.data.cell - state.data.mine === state.openedCount + openedCount) {
                halted = true;
                result = `${state.timer}초만에 승리하셨습니다.`;
            }
            state.opendCount += openedCount;
            state.halted = halted;
            state.result = result;
        },

        [CLICK_MINE](state, {row, cell}) {
            state.halted = true; //지뢰 밟았으니까 게임중단
            Vue.set(state.tableData[row], cell, CODE.CLICKED_MINE);
        },
        [FLAG_CELL](state, {row, cell}) {
            if (state.tableData[row][cell] === CODE.MINE) { //지뢰인경우
                Vue.set(state.tableData[row], cell, CODE.FLAG_MINE); //깃발지뢰로
            } else {
                Vue.set(state.tableData[row], cell, CODE.FLAG) //아닌경우는 빈칸에서 깃발로 바꾸고
            }
        },
        [QUESTION_CELL](state, {row, cell}) {
            if (state.tableData[row][cell] === CODE.FLAG_MINE) {
                Vue.set(state.tableData[row], cell, CODE.QUESTION_MINE)
            } else {
                Vue.set(state.tableData[row], cell, CODE.QUESTION)
            }
        },
        [NORMALIZE_CELL](state, {row, cell}) {
            if (state.tableData[row][cell] === CODE.QUESTION_MINE) {
                Vue.set(state.tableData[row], cell, CODE.MINE)
            } else {
                Vue.set(state.tableData[row], cell, CODE.NORMAL)
            }
        },
        [INCREMENT_TIMER](state) {
            state.timer += 1;
        },

    }
})