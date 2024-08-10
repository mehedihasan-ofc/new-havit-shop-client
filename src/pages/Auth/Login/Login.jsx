import { Button } from '@material-tailwind/react';
import { useContext, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../provider/AuthProvider';
import { toast } from 'react-toastify';
import { saveUser } from '../../../api/auth';

const Login = () => {

    const { signIn, signInWithGoogle } = useContext(AuthContext);

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        signIn(email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                toast.success("You are successfully logged in!", {
                    position: "top-center",
                    autoClose: 2000,
                });
                navigate(from, { replace: true });
            })
            .catch(error => {
                console.log(error);
                toast.error("User Not Found!", {
                    position: "top-center",
                    autoClose: 2000,
                })
            })
    };

    const handleGoogleLogin = () => {
        signInWithGoogle()
            .then(result => {
                const loggedUser = result.user;
                
                // save user database
                const userInfo = {
                    fullName: loggedUser.displayName,
                    email: loggedUser.email,
                    role: 'customer',
                    status: 'active',
                    createdAt: new Date().toISOString()
                };
                saveUser(userInfo);

                navigate(from, { replace: true });
            })
            .catch(err => {
                console.log(err);
                toast.error(`Error: ${err.message}`, {
                    position: "top-center",
                    autoClose: 2000,
                })
            })
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">

            <div className="sm:mx-auto sm:w-full sm:max-w-md">

                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 space-y-4">

                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                        <h2 className="text-center text-2xl font-extrabold text-gray-900">Havit Shop</h2>
                        <p className="text-center text-sm font-medium text-gray-700">Sign in to your account</p>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit}>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                                    placeholder="Enter your password"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    {showPassword ? (
                                        <HiEyeOff className="h-5 w-5 text-gray-400 cursor-pointer" onClick={togglePasswordVisibility} />
                                    ) : (
                                        <HiEye className="h-5 w-5 text-gray-400 cursor-pointer" onClick={togglePasswordVisibility} />
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember_me"
                                    name="remember_me"
                                    type="checkbox"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                                />
                                <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-gray-900 hover:text-primary">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>

                        <div>
                            <Button
                                type='submit'
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >Sign in
                            </Button>
                        </div>
                    </form>

                    <div className='text-center'>
                        <p className='text-sm'>Or Sign in With</p>

                        <hr className="border-blue-gray-50 mt-1 mb-3" />

                        <div className='flex justify-center items-center'>
                            <Button onClick={handleGoogleLogin} variant="outlined" className="flex items-center gap-3 text-sm capitalize font-medium px-10 py-2 rounded">
                                <FcGoogle size={20} />
                                Sign in with Google
                            </Button>
                        </div>
                    </div>

                    <div className='text-center'>
                        <Link to="/register">Don't have an account? Register here</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;