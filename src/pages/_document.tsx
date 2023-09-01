import {Analytics} from '@vercel/analytics/react';
import Document, {Head, Html, Main, NextScript} from 'next/document';

export default class WebsiteDocument extends Document {
	override render() {
		return (
			<Html>
				<Head />
				<body>
					<Main />
					<NextScript />
					<Analytics />
				</body>
			</Html>
		);
	}
}
