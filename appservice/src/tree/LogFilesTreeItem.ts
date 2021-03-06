/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { AzExtTreeItem, AzureParentTreeItem, GenericTreeItem } from 'vscode-azureextensionui';
import { ext } from '../extensionVariables';
import { localize } from '../localize';
import { FolderTreeItem } from './FolderTreeItem';
import { getThemedIconPath } from './IconPath';

/**
 * NOTE: This leverages a command with id `ext.prefix + '.startStreamingLogs'` that should be registered by each extension
 */
export class LogFilesTreeItem extends FolderTreeItem {
    public static contextValue: string = 'logFiles';
    public readonly contextValue: string = LogFilesTreeItem.contextValue;

    protected readonly _isRoot: boolean = true;

    constructor(parent: AzureParentTreeItem) {
        super(parent, localize('logFiles', 'Logs'), '/LogFiles', true);
    }

    public async loadMoreChildrenImpl(clearCache: boolean): Promise<AzExtTreeItem[]> {
        const children: AzExtTreeItem[] = await super.loadMoreChildrenImpl(clearCache);
        if (clearCache) {
            const ti: AzExtTreeItem = new GenericTreeItem(this, {
                contextValue: 'logStream',
                commandId: ext.prefix + '.startStreamingLogs',
                iconPath: getThemedIconPath('start-log'),
                label: localize('connectLogStream', 'Connect to Log Stream...')
            });
            ti.commandArgs = [this.parent]; // should be the slot tree item
            children.push(ti);
        }
        return children;
    }
}
