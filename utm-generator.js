(function() {
    var baseUrlEl = document.getElementById('utmBaseUrl');
    var sourceEl = document.getElementById('utmSource');
    var mediumEl = document.getElementById('utmMedium');
    var nameEl = document.getElementById('utmName');
    var termEl = document.getElementById('utmTerm');
    var contentEl = document.getElementById('utmContent');
    var previewEl = document.getElementById('utmPreviewUrl');
    var copyBtn = document.getElementById('utmCopy');
    var clearBtn = document.getElementById('utmClear');
    var breakdownEl = document.getElementById('utmBreakdown');

    function getVal(el) { return el ? el.value.trim() : ''; }

    function buildUrl() {
        var base = getVal(baseUrlEl);
        var source = getVal(sourceEl);
        var medium = getVal(mediumEl);
        var name = getVal(nameEl);
        var term = getVal(termEl);
        var content = getVal(contentEl);

        if (!base) return '';

        var params = [];
        if (source) params.push('utm_source=' + encodeURIComponent(source));
        if (medium) params.push('utm_medium=' + encodeURIComponent(medium));
        if (name) params.push('utm_campaign=' + encodeURIComponent(name));
        if (term) params.push('utm_term=' + encodeURIComponent(term));
        if (content) params.push('utm_content=' + encodeURIComponent(content));

        if (params.length === 0) return base;

        var sep = base.indexOf('?') !== -1 ? '&' : '?';
        return base + sep + params.join('&');
    }

    function updateBreakdown(source, medium, name, term, content) {
        if (!breakdownEl) return;
        var rows = [];
        if (source) rows.push(['utm_source', source, 'The referrer (e.g. google, newsletter)']);
        if (medium) rows.push(['utm_medium', medium, 'Marketing medium (e.g. cpc, email)']);
        if (name) rows.push(['utm_campaign', name, 'Campaign name or identifier']);
        if (term) rows.push(['utm_term', term, 'Paid search keywords']);
        if (content) rows.push(['utm_content', content, 'Used to differentiate ads']);

        if (rows.length === 0) { breakdownEl.innerHTML = ''; return; }

        var html = '<table class="utm-breakdown-table"><thead><tr><th>Parameter</th><th>Value</th><th>Description</th></tr></thead><tbody>';
        for (var i = 0; i < rows.length; i++) {
            html += '<tr><td class="utm-param-name">' + rows[i][0] + '</td><td class="utm-param-value">' + rows[i][1] + '</td><td>' + rows[i][2] + '</td></tr>';
        }
        html += '</tbody></table>';
        breakdownEl.innerHTML = html;
    }

    function update() {
        var url = buildUrl();
        if (previewEl) {
            if (url) {
                previewEl.textContent = url;
                previewEl.classList.add('utm-has-url');
            } else {
                previewEl.textContent = previewEl.getAttribute('data-placeholder') || '';
                previewEl.classList.remove('utm-has-url');
            }
        }
        updateBreakdown(getVal(sourceEl), getVal(mediumEl), getVal(nameEl), getVal(termEl), getVal(contentEl));
    }

    var inputs = [baseUrlEl, sourceEl, mediumEl, nameEl, termEl, contentEl];
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i]) inputs[i].addEventListener('input', update);
    }

    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            var url = buildUrl();
            if (!url) return;
            navigator.clipboard.writeText(url).then(function() {
                var orig = copyBtn.textContent;
                copyBtn.textContent = 'Copied!';
                setTimeout(function() { copyBtn.textContent = orig; }, 1500);
            });
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            for (var j = 0; j < inputs.length; j++) {
                if (inputs[j]) inputs[j].value = '';
            }
            update();
        });
    }
})();
