import React from 'react'
import './sign-in.styles.scss'
import { signInWithGoogle } from '../../firebase/firebase.utils';
import FormInput from '../form-input/form-input';
import CustomButton from '../custom-button/custom-button';



class SignIn extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({email: '', password: ''})
    }

    handleChange = (e) => {
        this.setState({[e.target.name] : e.target.value})
        
    }

    render(){
        return(
            <div className="sign-in">
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                   
                  

                    <FormInput handleChange={this.handleChange} label='Email' type="Email" name="email" value={this.state.email} required />
                    
                    <FormInput handleChange={this.handleChange} label='Password' type="Password" name="password" value={this.state.password} required />
                   

                    <div className="buttons">
                        
                        <CustomButton type='submit'>Sign In</CustomButton>

                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn>SIGN IN WITH GOOGLE</CustomButton>
                   </div>

                </form>
               
                   
            </div>
        )
    }
}

export default SignIn;