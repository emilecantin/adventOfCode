# Setup cache
1s/^/var cached={};/

# Avoid deserved keywords
s/do/doo/g
s/if/iff/g
s/in/inn/g

# Convert each wire input into a function
s/\([a-z0-9]*\) *\([A-Z]*\) *\([a-z0-9]*\) -> \([a-z]*\)$/function \4() {if (!cached.\4) { cached.\4 =  \1() \2 \3(); } return cached.\4;}/

# Remove empty function calls
s/ ()//

# Don't interpret numbers as functions
s/\([0-9][0-9]*\)()/\1/

# Use the correct operators
s/AND/\&/
s/OR/|/
s/LSHIFT/<</
s/RSHIFT/>>>/
s/NOT/~/

# Compute results and display them
$s/$/ var result1 = a(); cached = {b: result1}; result2 = a(); console.log('Part 1:', result1);console.log('Part 2:', result2);/
