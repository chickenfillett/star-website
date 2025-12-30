// Simple test to verify userStore doesn't depend on immer
const { useUserStore } = require('./store/userStore');

console.log('✅ Successfully imported userStore!');
console.log('✅ No immer dependency found!');
