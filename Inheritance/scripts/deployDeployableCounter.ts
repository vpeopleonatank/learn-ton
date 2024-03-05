import { toNano } from '@ton/core';
import { DeployableCounter } from '../wrappers/DeployableCounter';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const deployableCounter = provider.open(await DeployableCounter.fromInit());

    await deployableCounter.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(deployableCounter.address);

    // run methods on `deployableCounter`
}
