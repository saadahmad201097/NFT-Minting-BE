import { config } from 'dotenv';
config();

import abi from './abi.json';
import Web3 from 'web3';
import { EventData } from 'web3-eth-contract';

const contractAddress = "0xA8EAa44C43e1C1490e66a7C22516e2882a41C6C4";
const web3 = new Web3(process.env.INFURA_URL);

import EventService from './EventService';
const event = new EventService();


import { connect } from './config';

connect().then(() => {
    console.log('DB connected');
});

interface results {
    [key: string]: any;
}

const functionEvent = async (contractAbi, contractAddress) => {
    const contractInstance = new web3.eth.Contract(
        contractAbi,
        contractAddress
    );

    contractInstance.events.allEvents(async (_: any, data: EventData) => {
        if (data?.event === 'Transfer') {
            const eventValues: results = data.returnValues;
            console.log(eventValues)
            let { to, tokenId } = eventValues;
            tokenId = parseInt(tokenId);

            const dbResult = await event.eventHandler(
                to,
                tokenId
            );
            
            console.log('Transfer/mint Event successfully inserted');
            console.log(dbResult)
        }
      
    });
};

functionEvent(abi, contractAddress);