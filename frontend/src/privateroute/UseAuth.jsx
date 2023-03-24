import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const UseAuth = () => {
const [message, setMessage] = useState('');
const navigate = useNavigate();

const handleLogout = () => {
localStorage.removeItem('accessToken');
localStorage.removeItem('refreshToken');
setMessage('User logged out');
};

const fetchData = async () => {
try {
const accessToken = localStorage.getItem('accessToken');
if (!accessToken) {
navigate('/register'); // redirect to register page if accessToken not available
return;
}
const response = await axios.get('/', {
headers: { Authorization: `Bearer ${accessToken}` },
});
setMessage(response.data.message);
} catch (err) {
if (err.response && err.response.status === 401) {
try {
const refreshToken = localStorage.getItem('refreshToken');
const response = await axios.post('https://sore-pink-cockroach-hat.cyclic.app/user/login', { refreshToken });
localStorage.setItem('accessToken', response.data.accessToken);
setMessage('Token renewed');
} catch (err) {
setMessage('User logged out');
}
} else {
setMessage('Unknown error');
}
}
};

return (
<div>
<p>{message}</p>
<button onClick={handleLogout}>Logout</button>
<button onClick={fetchData}>Fetch data</button>
</div>
);
};

export default UseAuth;