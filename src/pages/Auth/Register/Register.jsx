import { Button } from '@material-tailwind/react';
import { useContext, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../provider/AuthProvider';
import { toast } from 'react-toastify';
import { saveUser } from '../../../api/auth';

const Register = () => {

    const { createUser, updateUserProfile, setLoading, signInWithGoogle } = useContext(AuthContext);

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [agreeTerms, setAgreeTerms] = useState(false);

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/';

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!agreeTerms) {
            return;
        }

        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match");
            return;
        } else {
            setPasswordError('');

            createUser(email, password)
                .then(result => {
                    const loggedUser = result.user;

                    updateUserProfile(loggedUser, fullName)
                        .then(() => {
                            setLoading(true);

                            // save user database
                            const userInfo = {
                                fullName,
                                email,
                                coin: 0,
                                role: 'customer',
                                profileImage: loggedUser?.photoURL,
                                createdAt: new Date().toISOString()
                            };
                            saveUser(userInfo);

                            toast.success("You have successfully signed up!", {
                                position: "top-right",
                                autoClose: 1600,
                            });

                            navigate(from, { replace: true })
                        })
                        .catch(err => {
                            toast.error(`Error: ${err.message}`, {
                                position: "top-center",
                                autoClose: 2000,
                            })
                        })

                })
                .catch(error => {
                    toast.error(`Error: ${error.message}`, {
                        position: "top-center",
                        autoClose: 2000,
                    })
                })
        }
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
                    coin: 0,
                    profileImage: loggedUser?.photoURL,
                    createdAt: new Date().toISOString()
                };
                saveUser(userInfo);

                navigate(from, { replace: true });
            })
            .catch(err => {
                toast.error(`Error: ${err.message}`, {
                    position: "top-center",
                    autoClose: 2000,
                })
            })
    }

    return (
        <div className="flex justify-center items-center h-full p-4">
            {/* <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8"> */}

            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 space-y-4">

                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                        <h2 className="text-center text-2xl font-extrabold text-gray-900">Havit Shop</h2>
                        <p className="text-center text-sm font-medium text-gray-700">Create an account</p>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="full-name" className="block text-sm font-medium text-gray-700">
                                Full Name
                            </label>
                            <div className="mt-1">
                                <input
                                    id="full-name"
                                    name="full-name"
                                    type="text"
                                    autoComplete="full-name"
                                    required
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Enter your full name"
                                />
                            </div>
                        </div>

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
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Enter your email address"
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
                                    autoComplete="new-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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

                        <div>
                            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <input
                                    id="confirm-password"
                                    name="confirm-password"
                                    type={showConfirmPassword ? "text" : "password"}
                                    autoComplete="new-password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="Confirm your password"
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    {showConfirmPassword ? (
                                        <HiEyeOff className="h-5 w-5 text-gray-400 cursor-pointer" onClick={toggleConfirmPasswordVisibility} />
                                    ) : (
                                        <HiEye className="h-5 w-5 text-gray-400 cursor-pointer" onClick={toggleConfirmPasswordVisibility} />
                                    )}
                                </div>
                            </div>
                            {passwordError && (
                                <p className="mt-2 text-sm text-red-600">{passwordError}</p>
                            )}
                        </div>

                        <div className="flex items-center">
                            <input
                                id="remember_me"
                                name="remember_me"
                                type="checkbox"
                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                                checked={agreeTerms}
                                onChange={() => setAgreeTerms(!agreeTerms)}
                            />
                            <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                                I agree to the <Link className='underline' to="/terms-conditions">terms & conditions</Link>
                            </label>
                        </div>

                        <div>
                            <Button
                                type='submit'
                                disabled={!agreeTerms}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >Sign Up
                            </Button>
                        </div>
                    </form>

                    <div className='text-center'>
                        <p className='text-sm'>Or Sign Up With</p>

                        <hr className="border-blue-gray-50 mt-1 mb-3" />

                        <div className='flex justify-center items-center'>
                            <Button onClick={handleGoogleLogin} variant="outlined" className="flex items-center gap-3 text-sm capitalize font-medium px-10 py-2 rounded">
                                <FcGoogle size={20} />
                                Sign in with Google
                            </Button>
                        </div>
                    </div>

                    <div className='text-center'>
                        <p>Already a member? <Link className='text-primary' to="/login">Login here</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
