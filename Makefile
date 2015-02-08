test:
	npm test

coverage:
	jscoverage lib lib-cov
	NODE_COVERAGE=1 mocha -R html-cov > coverage.html
	rm -rf lib-cov

clean:
	rm -rf lib-cov
	rm -rf cassettes
	rm coverage.html

.PHONY: test
