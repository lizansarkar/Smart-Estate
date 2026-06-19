import mongoose from 'mongoose';

async function testConnection(username, password) {
  const uri = `mongodb+srv://${username}:${password}@lizandatabase.hok2vf7.mongodb.net/smart-estate?appName=lizanDataBase`;
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 3000 });
    console.log(`✅ Success with username: ${username}`);
    process.exit(0);
  } catch (error) {
    console.log(`❌ Failed with username: ${username}`);
  }
}

async function run() {
  const passwords = ['Z-6jv4aLGn36nC', 'Z-6jv4aLGn36nC.'];
  const usernames = ['lizan', 'lizandatabase', 'admin', 'lizansarkar'];
  
  for (const user of usernames) {
    for (const pass of passwords) {
      await testConnection(user, pass);
    }
  }
  console.log('All attempts failed. User must provide exact username.');
  process.exit(1);
}

run();
