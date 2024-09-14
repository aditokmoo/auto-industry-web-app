import { useState } from "react";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";

export default function LoginLayout() {
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleButtonClick = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000); // Simulate loading for 2 seconds
    };

    return (
        <div>
            LoginLayout

            <div>
                <h1>Reusable Input Component with Label</h1>
                <Input
                    label="Text Input"
                    type="text"
                    placeholder="Enter text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    variant="default"
                    size="medium"
                />
                <Input
                    label="Email Address"
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    variant="success"
                    size="large"
                />
                <Input
                    label="Password"
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={true}
                    variant="error"
                    size="medium"
                />

                <Button
                    label="Submit"
                    onClick={handleButtonClick}
                    variant="primary"
                    size="medium"
                    disabled={loading}
                />
            </div>
        </div>
    )
}
