function sendAccountInfo(state){
    $('.alert-danger').hide();
    if(state === 0){    //Login State
        let loginName = document.getElementById("loginName");
        let loginPass = document.getElementById("loginPass");
        $("#loginBtn").hide();
    
        mp.trigger("loginDataToServer", loginName.value, loginPass.value, state);
    } else {    //Register State
        let registerName = document.getElementById("registerName");
        let registerPass = document.getElementById("registerPass");
        let registerPassCompare = document.getElementById("registerPass2");
        $("#registerBtn").hide();
    
        if(registerPass.value === registerPassCompare.value){
            mp.trigger("loginDataToServer", registerName.value, registerPass.value, state);
        } else {
            $(".password-mismatch").show();
            $("#registerBtn").show();
        }
    }
}