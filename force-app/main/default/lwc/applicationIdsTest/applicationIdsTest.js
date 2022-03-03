import { LightningElement, wire, track, api } from 'lwc';

// Apex Imports
import getApplicationDetail from '@salesforce/apex/atsApplicationHelperSimple.getApplications';
import simpleHTTPReuqest from '@salesforce/apex/simpleHTTPReuqest.getCalloutResponseContents';

export default class ApplicationIdsTest extends LightningElement {
    @api recordIds;
    @api applicationIds = [];
    @api recordId;
    @track _applicationIds = [];
    @track error;

    connectedCallback() {
        console.log(`Record Ids were passed to me: `, JSON.parse(JSON.stringify(this.applicationIds)));
        this._applicationIds = JSON.parse(JSON.stringify(this.applicationIds));
    }


    @wire(getApplicationDetail, {applicationIds: '$_applicationIds'})
    returnedData({data, error}) {
        if(data) {
            console.log(`getAppDetail returned ===> `, data);
        } else if(error) {
            console.log(`getAppDetail error ===> `, error);
            this.error = error;
        }
    }
}