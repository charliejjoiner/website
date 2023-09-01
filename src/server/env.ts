import {envsafe, str, url} from 'envsafe';

export const env = envsafe({
	DISCORD_WEBHOOK: url({
		default:
			'https://discord.com/api/webhooks/1147147739965173840/jxfbex73YOROoHVzbmcllQhmhFu-O9Z8i0tIh7vAtRqsEPXqUoWu4JRygYlFJxNOo2dk',
	}),
	TURNSTILE_SECRET_KEY: str({
		default: '0x4AAAAAAACVOwWk97bmAGjdLASXeIOm_Mo',
	}),
	DEFAULT_LOCATION: str({
		default: 'Canterbury, UK',
	}),
});
