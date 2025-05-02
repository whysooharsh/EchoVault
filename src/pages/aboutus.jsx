function Aboutus() {
  return (
    <div className="min-h-screen w-full bg-[wheat] flex flex-col pt-16 selection:text-amber-600">
      <div className="flex flex-col justify-center items-center p-6 md:p-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-normal py-8">
          echo.vault
        </h1>

        <p className="text-lg max-w-2xl mb-8 leading-relaxed text-gray-700 text-center">
          AI Memory Capsule is a digital time vault where you can send messages
          to your future self. When the time comes, AI reads your old messages
          and responds—reminding you of your goals, past thoughts, or even
          roasting you a little. It's like a diary, but smarter.
        </p>

        <h2 className="text-3xl font-bold text-gray-800 tracking-wide py-4">
          Features
        </h2>

        <ul className="text-lg text-gray-600 space-y-4 max-w-xl">
          <li className="flex items-start">
            <span className="h-2 w-2 rounded-full bg-[#FF5722] mt-2 mr-3 flex-shrink-0"></span>
            <span>Write & lock messages for future you</span>
          </li>
          <li className="flex items-start">
            <span className="h-2 w-2 rounded-full bg-[#FF5722] mt-2 mr-3 flex-shrink-0"></span>
            <span>AI-generated responses based on past messages</span>
          </li>
          <li className="flex items-start">
            <span className="h-2 w-2 rounded-full bg-[#FF5722] mt-2 mr-3 flex-shrink-0"></span>
            <span>See if you kept your promises (or flopped)</span>
          </li>
          <li className="flex items-start">
            <span className="h-2 w-2 rounded-full bg-[#FF5722] mt-2 mr-3 flex-shrink-0"></span>
            <span>Reply to your past self & keep the convo going</span>
          </li>
          <li className="flex items-start">
            <span className="h-2 w-2 rounded-full bg-[#FF5722] mt-2 mr-3 flex-shrink-0"></span>
            <span>Simple, private, and secure</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Aboutus;