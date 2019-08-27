var s设置 = {
    上滑动范围:[1,3],
    下滑动范围:[5,8],
    好友资料上划:[1,2],
    好友资料下划:[5,7],
    发送的文字:["刷屏1","刷屏2","刷屏3","刷屏4","刷屏5","刷屏6","刷屏7"],
    发送文字次数:[1,3],
    发送语音次数:[1,3],
    发送语音时长:[7000,11000],
    相片文件夹名:["相册","QQ_Images","脚本"],
    发送相片随机:[4,6],
    关注随机:[6,8]
    

}

var k控制变量 = {
    发文字与语音或图片:true,
    发送消息:false,
    点击计数:0,
    关注:0,
    发图: random(s设置.关注随机[0], s设置.关注随机[1]),
    发过消息:false,

}
toast("脚本开始")
while(true){
    寻找目标()
    聊天界面执行操作()
    进入好友资料()
    判断好友详情()
}

//var c = className("android.widget.TextView").id("recordAnimeTextView").findOne().exists();
//var c = className("android.widget.LinearLayout").id("message_layout_messagecontainer").exists();
//toast(c)
toast("脚本停止")
//var sendButton = className("android.widget.TextView").clickable(true).findOne().click();
//untilFindt

function 遍历红点(){
    var tmp = new Array, arr = new Array(),arr1 = new Array;
    
    var c = className("android.widget.TextView").id("chatlist_item_tv_status_new").find();
        for (let index in c) {
            c.forEach(function (item, index, array){
                tmp[index] = array[index];
        })};

        for (let index = 0; index < tmp.length; index++) {
            var src = JSON.parse(JSON.stringify(tmp[index])).mInfo.mBoundsInScreen;
                arr[index] = [[Number(src.bottom)],[Number(src.left)],[Number(src.right)],[Number(src.top)]]
                
                
        }
         return arr;
         //console.log(jsObj4.mInfo.mBoundsInScreen); 
         //console.log(tmp.length)
         //.mBoundsInScreen

}

function 聊天界面执行操作(){
    if (className("android.widget.TextView").id("chat_menu_profile").exists()) {
        if (!className("android.widget.LinearLayout").id("message_layout_messagecontainer").exists() || k控制变量.发过消息) {//发过图片
            className("android.widget.ImageButton").findOne().click();
        }else{
            if(k控制变量.发送消息){
                //k控制变量.关注 = random(s设置.关注随机[0], s设置.关注随机[1])
                if(k控制变量.点击计数!=0){
                    if (k控制变量.点击计数%k控制变量.关注 == 0) {
                        发送照片()
                        k控制变量.关注 =  random(s设置.关注随机[0], s设置.关注随机[1])
                    }else{
                        发送文字()
                        发送语音()
                    }
                }else{
                    发送文字()
                    发送语音()
                }
            }else{
                className("android.widget.TextView").id("chat_menu_profile").findOne().click()//退出
            }
        }
    }
}


function 进入好友资料(){
    //android.widget.TextView
    if (className("android.widget.TextView").text("聊天设置").exists()) {
        toast("进入好友资料")
        click(268,198)
    }
}

function 判断好友详情(){
    //menu_edit
    if (className("android.widget.TextView").id("menu_edit").exists()){
        for (let index = 0; index < random(s设置.好友资料上划[0], s设置.好友资料上划[1]) + random(s设置.好友资料下划[0], s设置.好友资料下划[1]); index++) {
            if(random(0,1) == 0){
                swipe(213,270, 213,800, 400)
            }else{
                swipe(213,800,213,270, 400)
            }
        }
        //关注过
        className("android.widget.FrameLayout").id("profile_layout_start_chat").findOne().click();
        k控制变量.发送消息 = true
    }
}

function 发送文字(){
    for (let index = 0; index < random(s设置.发送文字次数[0], s设置.发送文字次数[1]); index++) {
        className("android.widget.EditText").findOne().setText(s设置.发送的文字[random(0, (s设置.发送的文字.length - 1))])
        className("android.widget.Button").id("message_btn_sendtext").findOne().click();
    }
    //className("android.widget.EditText").findOne().setText("刷屏...");
}

function 发送语音(){
    if(!className("android.widget.ImageView").id("message_btn_gotoaudio").findOne().selected()){
        className("android.widget.ImageView").id("message_btn_gotoaudio").findOne().click();
        发送语音()
    }else{
        //344,1001
        for(let index = 0; index < random(s设置.发送语音次数[0], s设置.发送语音次数[1]); index++){
            toast("发送语音")
            press(363,1131, random(s设置.发送语音时长[0], s设置.发送语音时长[1]))
            
        }
        k控制变量.发过消息 = true
    }
    
}

function 发送照片(){
    if (className("android.widget.TextView").id("chat_menu_profile").exists()) {
    if(!className("android.widget.ImageView").id("message_btn_selectpic").findOne().selected()){
        className("android.widget.ImageView").id("message_btn_selectpic").findOne().click();
    }else{
        className("android.widget.LinearLayout").id("multpic_choose_photo").findOne().click();
    }
}
选择照片()

}

function 选择照片(){
    toast(className("android.widget.TextView").id("tab_title").exists())
    if (className("android.widget.TextView").id("tab_title").exists()){
        if (className("android.widget.TextView").id("tab_title").findOne().text() != s设置.相片文件夹名[1]) {
            var zb = className("android.widget.TextView").id("tab_title").findOne().bounds()
        //bottom,left,top,right
        click(zb.left, zb.top)
        }else{
            选择一个()
        }
        
    }
    选择目录();
    
}

function 选择一个(){
    if (!className("android.widget.TextView").id("finish").text("完成(1)").exists()) {
        var zb = className("android.widget.FrameLayout").id("item_layout").indexInParent(random(1, 14)).findOne().child(1)
    //console.log(c.bounds())
    click(zb.bounds().left+20, zb.bounds().top+20)
    }else{
        className("android.widget.TextView").id("finish").text("完成(1)").findOne().click();
    }
    
    

}

function 选择目录(){
    if (className("androidx.recyclerview.widget.RecyclerView").id("recycler_view").exists()) {
        if (className("android.widget.TextView").id("diretory_name").text(s设置.相片文件夹名[1]).exists()) {
            var zb = className("android.widget.TextView").id("diretory_name").text(s设置.相片文件夹名[1]).findOne().bounds()
            click(zb.left, zb.top)
        }else{scrollDown()}
    }
}

function 寻找目标(){
    if(className("android.widget.RelativeLayout").id("action_jump_contact").exists()){
        k控制变量.发送消息 = false
        好友界面滑动()
        if(遍历红点().length != 0){
            点击红点();
            k控制变量.点击计数 = k控制变量.点击计数 + 1
        }
    }
}

function 点击红点(){
    var arr = new Array
    arr = 遍历红点()
    var x = Number(arr[random(0,arr.length-1)][1])
    var y = Number(arr[random(0,arr.length-1)][3])
    console.log(x+"|"+y+"|"+arr)
    click(x-50, y)
}

function 好友界面滑动(){
    if(random(0,1) == 0){
        for (let index = 0; index < random(s设置.上滑动范围[0], s设置.上滑动范围[1]); index++) {
            scrollUp()
        }
    }else{
        for (let index = 0; index < random(s设置.下滑动范围[0], s设置.下滑动范围[1]); index++) {
            scrollDown()
        }
    }
}

function 生成随机设置(){
    k控制变量.关注 = random(s设置.关注随机[0], s设置.关注随机[1])
    k控制变量.发图 = random(s设置.发送相片随机[0],s设置.发送相片随机[0])
}

/**
 * 产生随机整数，包含下限值，包括上限值
 * @param {Number} lower 下限
 * @param {Number} upper 上限
 * @return {Number} 返回在下限到上限之间的一个随机整数
 */
function random(lower, upper) {
	return Math.floor(Math.random() * (upper - lower+1)) + lower;
}