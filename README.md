
<!--#echo json="package.json" key="name" underline="=" -->
eslint-config-nodejs-pmb
========================
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
My favorite eslint rules
<!--/#echo -->



<!--#toc stop="scan" -->



Known issues
------------

* These rules are based on `eslint-config-airbnb-base@15.0.0`,
  which is very old and compatible only with very old eslint.
  ([Their attempt to upgrade to v9][airbnb-eslint-v9-attempt]
  seems to have died in 2024 already.)
  I'll try and override some of their transitive dependencies in order to
  evade security vulnerabilities, but in the long run,
  I'll have to untether my rules from theirs.
* Needs more/better tests and docs.




&nbsp;

  [airbnb-eslint-v9-attempt]: https://github.com/airbnb/javascript/issues/2961

License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
