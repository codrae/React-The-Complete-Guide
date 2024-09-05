import '../index.css';
import logo from '../assets/investment-calculator-logo.png';

export default function Header(){
    return <header id="header">
        <img src={logo}  alt = 'Logo showing a money bag'></img>
        <h1>Investment Calculator</h1>
    </header>
}