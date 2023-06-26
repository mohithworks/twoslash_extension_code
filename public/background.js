const getConfig = async () => {
    const {
        userid,
        model,
        temperature,
        maxTokens,
        topP,
        frequencyPenalty,
        presencePenalty,
    } = await chrome.storage.sync.get([
        "userid",
        "model",
        "temperature",
        "maxTokens",
        "topP",
        "frequencyPenalty",
        "presencePenalty",
    ]);

    console.log(userid)

    var currentActiveTab;
    
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        currentActiveTab = tabs[0];
        console.log(currentActiveTab);
    });

    const url = `https://twoslash-backend.onrender.com/getApi?userid=${userid}`;

    // Create headers
    const headers = {
        "Content-Type": "application/json",
    };

    // Make request
    const res = await fetch(url, {
        method: "POST",
        headers: headers,
    });

    if(res) {
        const json = await res.json();
        console.log(json);
        return {
            apiKey: json.body.apiKey || "",
            model: json.body.model || "gpt-3.5-turbo-0301",
            temperature: temperature || 0.7,
            maxTokens: maxTokens || 256,
            topP: topP || 1,
            frequencyPenalty: frequencyPenalty || 0,
            presencePenalty: presencePenalty || 0,
            currentTab: currentActiveTab.id
        };
    }


};

const getNextTokens = async (prompt) => {
    // Get config from storage
    const {
        apiKey,
        model,
        temperature,
        maxTokens,
        topP,
        frequencyPenalty,
        presencePenalty,
        currentTab,
    } = await getConfig();

    const chatModels = ["gpt-4", "gpt-4-0314", "gpt-4-32k", "gpt-4-32k-0314", "gpt-3.5-turbo", "gpt-3.5-turbo-0301"];
    const chatModel = chatModels.includes(model) ? true : false;

    // Create request body
    const data = chatModel ? 
    { model: model, messages: [{role: "user", content: prompt }] } 
    :
    {
        prompt: prompt,
        //suffix: suffix || null,
        model: model,
        max_tokens: maxTokens,
        temperature: temperature,
        top_p: topP,
        frequency_penalty: frequencyPenalty,
        presence_penalty: presencePenalty,
    };

    const url =  chatModel ? "https://api.openai.com/v1/chat/completions" : "https://api.openai.com/v1/completions";

    // Create headers
    const headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + apiKey,
    };

    // Make request
    const res = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
    });

    const json = await res.json();

    if (json.error) {
        return { error: json.error, tab: currentTab };
    }

    console.log(currentTab)
    
    return { text: chatModel ? json.choices[0].message.content : json.choices[0].text, tab: currentTab };
};

chrome.runtime.onMessage.addListener(async (request) => {
    if (request.text != null) {
        // Communicate with content script to get the current text
        const prompt = request.text;
        const nextTokens = await getNextTokens(prompt);

        // Communicate with content script to update the text
        console.log(nextTokens)
        chrome.tabs.sendMessage(nextTokens.tab, { generate: nextTokens });
        
    }
});
//getConfig()
