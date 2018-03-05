/**
 * Created by Julian/Wolke on 08.11.2016.
 */
/**
 * The basic importer class
 *
 *
 */
class BasicImporter {
    constructor() {

    }

    convertDuration(info) {
        let durationConv = '';
        if (typeof (info.duration) === 'undefined' && typeof (info.length_seconds) === 'undefined') {
            return durationConv;
        }
        if (typeof (info.duration) !== 'undefined') {
            let durationSplit = info.duration.split(':');
            for (let i = 0; i < durationSplit.length; i++) {
                if (i !== durationSplit.length - 1) {
                    if (durationSplit[i].length === 1) {
                        durationConv = durationConv + '0' + durationSplit[i] + ':';
                    } else {
                        durationConv = durationConv + durationSplit[i] + ':';
                    }
                } else {
                    if (durationSplit[i].length === 1) {
                        durationConv = durationConv + '0' + durationSplit[i];
                    } else {
                        durationConv = durationConv + durationSplit[i];
                    }
                }
            }
            return durationConv;
        } else if (typeof (info.length_seconds) !== 'undefined') {
            let d = Number(info.length_seconds);
            let h = Math.floor(d / 3600);
            let m = Math.floor(d % 3600 / 60);
            let s = Math.floor(d % 3600 % 60);
            return ((h > 0 ? h + ':' + (m < 10 ? '0' : '') : '') + m + ':' + (s < 10 ? '0' : '') + s);
        }
    }

}
module.exports = BasicImporter;