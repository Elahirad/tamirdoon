import {ReactNode} from 'react';
import Navbar from '../../components/Navbar';

interface Props {
	children: ReactNode;
}

const Layout = ({children}: Props) => {
	return (
		<>
			<Navbar />
			{children}
		</>
	);
};

export default Layout;
