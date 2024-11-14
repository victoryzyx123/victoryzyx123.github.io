// handle/login.js

document.getElementById('loginLink').addEventListener('click', async function(event) {
    event.preventDefault(); // 阻止默认链接行为

    const username = document.querySelector('input[name="username"]').value;
    const password = document.querySelector('input[name="password"]').value;

    // 在登录过程中记录ip地址
    localStorage.setItem('ip', 'http://10.21.205.92:3000/');

    try {
        var ipAdress = localStorage.getItem('ip');
        var responseURL = ipAdress + 'api/login';

        const response = await fetch(responseURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log('登录成功:', data);
            // 保存用户id和用户名到 localStorage
            localStorage.setItem('userid', data.uid);
            localStorage.setItem('username', data.username);
            localStorage.setItem('userpic', data.userpic);
            // 处理登录成功后的逻辑，如重定向到用户主页或保存 token
            alert('登录成功');
            window.location.href = 'function.html'; // 重定向到 function.html
        } else {
            const errorText = await response.text();
            console.error('登录失败:', errorText);
            // 显示错误信息给用户
            alert('登录失败，请检查用户名或密码');
        }
    } catch (error) {
        console.error('请求失败:', error);
        // 显示错误信息给用户
        alert('登录失败，请检查网络连接');
    }
});
