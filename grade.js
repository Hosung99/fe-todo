
    const readline = require("readline");

    const todos =  [ 
        {
            'name' : '자바스크립트 공부하기', 
            'tags' : ['programming', 'javascript'],
            'status' : 'todo',
            'id' : 12123123
        },
                        {
            'name' : ' 그림 그리기', 
            'tags' : ['picture', 'favorite'],
            'status' : 'doing',
            'id' : 312323
        }
    ];

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.on("line", (line) => {
        let [order1, order2, order3] = line.split("$");
        if(order1 == "show" ){
            let currentStatus = {
                'todo':0,
                'doing':0,
                'done':0
            };
            todos.map((value) => {
                for (const key in currentStatus){
                    if (value.status == key)
                        currentStatus[key] += 1;
                }
            })
            if(order2 == "all")
                console.log(`현재상태 : todo: ${currentStatus.todo}개, doing:${currentStatus.doing}개, done:${currentStatus.done}개`);
            else{
                let order2Count = currentStatus[order2];
                let answer = `${order2}리스트: 총 ${order2Count}건 : `;
                todos.map((value, index) => {
                    if(value.status == order2){
                        answer += `' ${value.name}, ${value.id}'`
                        if (index != todos.length)
                            answer += ', ';
                    }
                })
                console.log(answer);
            }
        }
        // else if (order1 == "add"){
        //     //todos에 push todo상태가 디폴트
        //     //order3를 todo태그로 추가
        //     //id를 랜덤만들기
        //     let randomId = parseInt(Math.random()*10000000);
        //     //todos에 id로 넣기
        //     //id 중복처리
        //     //todos를 순회해서 이미 존재하는지 찾고 있을시 다시.
        // }
        // else if (order1 == "delete"){
        //     for(x of todos){
        //         if (todos.id == order2){
        //             //삭제
        //         }
        //         break;
        //     }
        // }
        // else if (order1 == "update"){
        //     for(x of todos){
        //         if (todos.id == order2){
        //             todos.status == order3;
        //             break;
        //         }
        //     }
        // }
        rl.close();
    });
    rl.on('close', () => {
        process.exit();
    })
