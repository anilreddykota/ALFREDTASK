import React, { useState } from 'react';
import axios from 'axios';

const AuthForm = ({ handleLogin }) => {
  // State to track whether we're showing login or register form
  const [isLogin, setIsLogin] = useState(true);
  
  // Form input states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  
  // Loading and error states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Handle form submission for registration
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Registration logic
      if (password !== confirmPassword) {
        setError('Passwords do not match!');
        setIsLoading(false);
        return;
      }
      
      // Call the registration API
      const response = await axios.post('http://localhost:5000/auth/register', {
        name,
        email,
        password
      });
      
      // If successful, store the token and user info
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // Reset form after successful submission
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        
        // Switch to login after successful registration
        setIsLogin(true);
        
        // Show success message
        alert('Registration successful! Please log in.');
      }
      
    } catch (err) {
      // Handle error responses from server
      const errorMessage = err.response?.data?.message || 'An error occurred during registration';
      setError(errorMessage);
      console.error('Registration error:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle login using the provided handleLogin prop
  const onLoginSubmit = (e) => {
    e.preventDefault();
    
    if (email && password) {
        console.log(email, password);
      handleLogin(email, password );
    } else {
      setError('Email and password are required');
    }
  };
  
  const renderLoginForm = () => (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Login to FlashCard App</h2>
      
      {error && <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}
      
      <form >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={isLoading}
            onClick={onLoginSubmit}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#"
            onClick={(e) => {e.preventDefault(); /* Handle forgot password logic */}}
          >
            Forgot Password?
          </a>
        </div>
      </form>
      
      <div className="text-center mt-6">
        <p className="text-gray-600">
          Don't have an account?{' '}
          <a
            href="#"
            className="font-bold text-blue-500 hover:text-blue-800"
            onClick={(e) => {e.preventDefault(); setIsLogin(false); setError('');}}
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
  
  const renderRegisterForm = () => (
    <div className="w-full max-w-md mx-auto bg-gray-500 rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Create a FlashCard Account</h2>
      
      {error && <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Full Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="reg-email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="reg-email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="reg-password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="reg-password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm-password">
            Confirm Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="confirm-password"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </div>
      </form>
      
      <div className="text-center mt-6">
        <p className="text-gray-600">
          Already have an account?{' '}
          <a
            href="#"
            className="font-bold text-blue-500 hover:text-blue-800"
            onClick={(e) => {e.preventDefault(); setIsLogin(true); setError('');}}
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
  
  return isLogin ? renderLoginForm() : renderRegisterForm();
};

export default AuthForm;