async function handleRegister() {

    const username = document.querySelector('input[name="username"]').value;
    const password = document.querySelector('input[name="password"]').value;
    const confirmPassword = document.querySelector('input[name="confirm_password"]').value;
    // const userpic = document.querySelector('input[name="userpic"]').value; // 新增

    // 验证密码一致性
    if (password !== confirmPassword) {
        alert("两次输入的密码不一致");
        return;
    }

    // 在登录过程中记录ip地址
    localStorage.setItem('ip', 'http://10.21.205.92:3000/');

    try {
        var ipAdress = localStorage.getItem('ip');
        var responseURL = ipAdress + 'api/register';

        const response = await fetch(responseURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
                // userpic: '' // 用户头像链接
            }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log('注册成功:', data);
            // 处理注册成功后的逻辑，比如重定向或提示用户
            alert('注册成功！'); // 选择在这里显示一个成功的提示信息
            // 一段时间后跳转（如果需要，可以设置延迟）
            setTimeout(() => {
                window.location.href = 'index.html'; // 替换为你的登录页面路径
            }, 1000); // 1秒后跳转
        } else {
            const errorText = await response.text();
            console.error('注册失败:', errorText);
            // 显示错误信息给用户
            alert('注册失败，请检查输入是否正确');
        }
    } catch (error) {
        console.error('请求失败:', error);
        // 显示错误信息给用户
        alert('注册失败，请检查网络连接');
    }
}
