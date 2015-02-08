test:
	npm test

coverage:
	jscoverage lib lib-cov
	NODE_COVERAGE=1 mocha -R html-cov > coverage.html
	rm -rf lib-cov
	open coverage.html

clean:
	rm -rf lib-cov
	rm -rf cassettes
	rm coverage.html

.PHONY: test
