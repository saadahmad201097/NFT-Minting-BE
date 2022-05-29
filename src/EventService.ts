import { Service } from 'typedi';
import { getRepository } from 'typeorm';

import { Events } from './entities/Event';

@Service()
export default class EventService {
    public async eventHandler(
        _to: string,
        _tokenId: number,
    ): Promise<any> {

        const event = getRepository(Events);
        const insert = await event.save({
            tokenId: _tokenId,
            assignedTo: _to
        });
        return insert;
    }
}
