import  {use, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {login} from '../../api/auth'

export default function Login() {
    const [form, setForm] = useState({email: "", password: ""})
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {data} = await login(form)
        localStorage.setItem("token", data.data.accessToken);
        navigate("/dashboard")
    }

    return(
        <form>
            <input value={form.username} onChange={(e) => setForm({...form, username: e.target.value})} placeholder="Username" />
            <input value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} placeholder="Password"    type="password" />
            <button type="submit">Login</button>
        </form>
    )
}