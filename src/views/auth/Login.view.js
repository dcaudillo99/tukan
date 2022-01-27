import {useState} from "react";
import {signIn} from "../../utils/auth";
import { Navigate } from "react-router-dom";

const Login = () => {
    const [credentials, setCredentials] = useState({username:'', password: ''});
    const [access, setAccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        const me = await signIn(credentials)
        if(!me.ok)
            setError(me.data);
        else setAccess(true)
    }

    const handleOnChangeCredentials = (evt) => {
        setCredentials(prevState => ({...prevState, [evt.target.name]: evt.target.value}))
    }

    if( access ) return <Navigate to="/messages" />
    return (
        <div className="body-bg min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0">
            <header className="max-w-lg mx-auto">
                <a href="#">
                    <h1 className="text-4xl font-bold text-white text-center">Chatroom</h1>
                </a>
            </header>

            <main className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
                <section>
                    <h3 className="flex justify-left font-bold text-2xl">Welcome to Chatroom</h3>
                    <p className="flex justify-left text-gray-600 pt-2"> Sign in to your account</p>
                </section>

                <section className="mt-10">
                    <form className="flex flex-col">
                        <div className="mb-6 pt-3 rounded bg-gray-200">
                            <label className="flex justify-left text-gray-700 text-sm font-bold mb-2 ml-3">Username</label>
                            <input name="username" onChange={handleOnChangeCredentials} className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-teal-600 transition duration-500 px-3 pb-3" type="text"/>
                        </div>
                        <div className="mb-6 pt-3 rounded bg-gray-200">
                            <label className="flex justify-left text-gray-700 text-sm font-bold mb-2 ml-3">Password</label>
                            <input name="password" onChange={handleOnChangeCredentials} className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-teal-600 transition duration-500 px-3 pb-3" type="password"/>
                        </div>
                        <p className="flex justify-left text-red-500 mb-3">{error}</p>
                        <div className="flex justify-end">
                            <a className="text-sm text-teal-600 hover:text-teal-700 hover:underline mb-6">Forgot your password?</a>
                        </div>
                        <button onClick={handleSubmit} className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200">Sign In</button>
                    </form>
                </section>
            </main>
            <div className="max-w-lg mx-auto text-center mt-12 mb-6">
                <p className="text-white">Don't have an account? <a href="#" className="font-bold hover:underline">Sign
                    up</a>.</p>
            </div>

            <footer className="max-w-lg mx-auto flex justify-center text-white">
                <a href="#" className="hover:underline">Contact</a>
                <span className="mx-3">•</span>
                <a href="#" className="hover:underline">Privacy</a>
            </footer>
        </div>
    )
}

export default Login;