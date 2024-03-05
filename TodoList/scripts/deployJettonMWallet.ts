import { toNano } from '@ton/core';
import { JettonMWallet } from '../wrappers/JettonMWallet';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const jettonMWallet = provider.open(await JettonMWallet.fromInit());

    await jettonMWallet.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(jettonMWallet.address);

    // run methods on `jettonMWallet`
}
