import { useState } from 'react'

export default function SignUpForm({ setToken }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [usernameError, setUsernameError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);

    async function handleSubmit(event) {
        event.preventDefault();
    
        setUsernameError(null);
        setPasswordError(null);

        if (username.length < 8) {
            setUsernameError("Username must be at least 8 characters.");
            return;
        }

        if (password.length < 6) {
            setPasswordError("Password must be at least 6 characters.");
            return;
        }

        try {

            const response = await fetch(
                "https://fsa-jwt-practice.herokuapp.com/signup", {
                    method: "POST",
                    headers: {"Content-Type": "application/JSON"},
                    body: JSON.stringify({username, password}),
            });

            const result = await response.json();
            console.log(result);
            
            setToken(result.token);
        }
    
        catch (error) {
          setError(error.message);
        }
      }
    

    return (
        <section>
            <h2>Sign Up!</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Username: 
                    <input 
                        value={username} 
                        name="username"
                        placeholder='Username'
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                </label>
                <label>
                    Password: 
                    <input 
                        type="password" 
                        value={password} 
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </label>
                <button>Submit</button>
            </form>
        </section>
    )
  }