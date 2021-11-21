export default function Ga(routePath) {
    this.routeKey = routePath;
    if (!this.routeKey) {
        console.error('Init error!');
        return false;
    }
    const routePathGa = localStorage.getItem(this.routeKey);
    if (!routePathGa) {
        localStorage.setItem(routePath, '{}');
    }
}

Ga.prototype._getJson = function() {
    const gav = localStorage.getItem(this.routeKey);
    return JSON.parse(gav);
}

Ga.prototype.add = function(anchor) {
    let jsonGav = this._getJson();
    if (typeof anchor === 'string') {
        const anchorLayers = anchor.split('.');
        let temp = jsonGav;
        anchorLayers.forEach((v, index) => {
            if (index !== anchorLayers.length - 1) {
                if (!temp[v]) {
                    temp[v] = {};
                }
                temp = jsonGav[v];
            } else {
                if (!temp[v]) {
                    temp[v] = 1;
                } else {
                    temp[v] += 1;
                }
            }
        });
        localStorage.setItem(this.routeKey, JSON.stringify(jsonGav));
    } else {
        console.log('Ga anchor must be string type!');
    }
}

Ga.prototype.getAnchor = function(anchor) {
    let jsonGav = this._getJson();
    if (typeof anchor === 'string') {
        const anchorLayers = anchor.split('.');
        let temp = jsonGav;
        anchorLayers.forEach((v) => {
            temp = temp[v] ? temp[v] : {};
        })

        return temp;
    } else if (typeof anchor === 'undefined') {
        return jsonGav;
    } else {
        return {};
    }
};

Ga.prototype.getAnchorSort = function(anchor) {
    const currAnchor = this.getAnchor(anchor);
    if (currAnchor instanceof Object) {
        const keys = Object.keys(currAnchor);
        const numKeys = keys.filter((v) => {
            return typeof currAnchor[v] === 'number';
        });
        return numKeys.sort((prev, next) => {
            return currAnchor[next] - currAnchor[prev];
        });
    } else {
        const anchors = anchor.split('.');
        return [anchors[anchors.length - 1]];
    }

}

Ga.prototype.clear = function() {
    localStorage.removeItem(this.routeKey);
}