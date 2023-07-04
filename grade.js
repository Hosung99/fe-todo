
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt:'명령하세요 : '
});

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
    let currentStatus = {
        'todo':0,
        'doing':0,
        'done':0,
    };
    let statusName=["todo","doing","done"];
    todos.map((value) => {
        for (const key in currentStatus){
            if (value.status == key)
                currentStatus[key] += 1;
        }
    });
    function printStatus(){
        console.log(`현재상태 : todo: ${currentStatus.todo}개, doing:${currentStatus.doing}개, done:${currentStatus.done}개`);
    }
     rl.on("line", (line) => {
        let [order1, order2, order3] = line.split("$");
        if(order1 == "show" ){
            if(order2 == "all")
                printStatus();
            else{
                if (!statusName.includes(order2))
                    console.log("상태를 잘못 입력하셨습니다!");
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
        }
        else if (order1 == "add"){
            let flag = 0;
            let randomId = parseInt(Math.random()*100000000);
            if (todos.length == 100000000)
                console.log("꽉 차서 add가 불가능합니다.");
            else{
            do
            {
                for (let todo of todos){
                    if (todo.id == randomId)
                    {
                        randomId = parseInt(Math.random()*100000000);
                        flag = 1;
                        break;
                    }
                    else
                        flag = 0;
                }
            }while(flag);
                let tempArray = order3.replace("[", "").replace("]", "").replace(/"/gi, "").split(',');
                let tempObject={
                    'name':order2,
                    'tags':tempArray,
                    'status':'todo',
                    'id':randomId
                };
                todos.push(tempObject);
                currentStatus.todo++;
                console.log(`${order2} 1개가 추가 됐습니다. (id : ${randomId})`);
                printStatus();
            }
        }
        else if (order1 == "delete"){
            if (todos.length == 0)
                console.log("todo-list가 비어있습니다.");
            else{
            let flag = 1;
            todos.map((todo,index)=>{
                if(order2 == todo.id)
                {
                    console.log(`${todo.name} ${todo.status}가 목록에서 삭제됐습니다`);
                    currentStatus[todo.status]--;
                    todos.splice(index,1);
                    flag = 0;
                }
            });
            if (flag)
                console.log("없는 아이디 입니다.");
            printStatus();
            }
        }
        else if (order1 == "update"){
            if (!statusName.includes(order3))
                console.log("상태를 잘못 입력하셨습니다!");
            else{
                let flag = 1;
            todos.map((todo,index)=>{
                if(order2 == todo.id)
                {
                    console.log(`${todo.name} ${order3}으로 상태가 변경됐습니다`);
                    currentStatus[todo.status]--;
                    todos[index].status = order3;
                    currentStatus[todo.status]++;
                    flag = 0;
                }
            });
            if (flag)
                console.log("없는 아이디 입니다.");
            printStatus();
            }
        }
        else
            rl.close();
    });
    rl.on('close', () => {
        process.exit();
    })