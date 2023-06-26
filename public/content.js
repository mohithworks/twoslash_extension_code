var LAST_ACTIVE_EL = null;
var etext;

const insertText = async (text) => {
    // Insert text as HTML for content editable
    const spl_text = text.split("\n");
    const newtext = text.replace(etext, '');
    var res = "";

    for (const s of spl_text) {
        if (s == "") {
            res += "<div><br></div>";
        } else {
            res += "<div>" + s + "</div>";
        }
    }

    if(LAST_ACTIVE_EL){
        if (
            LAST_ACTIVE_EL.nodeName.toUpperCase() === "TEXTAREA" ||
            LAST_ACTIVE_EL.nodeName.toUpperCase() === "INPUT"
          ) {
              LAST_ACTIVE_EL.value = text;
          } else {
            // for contenteditable
            // for Twitter and Notion
            if ((document.URL.indexOf("mail.google.com") > -1) || (document.URL.indexOf("docs.google.com") > -1)){
                console.log(LAST_ACTIVE_EL.value);
                const data = new DataTransfer()
                LAST_ACTIVE_EL.focus(); // Focus on the input element
                document.execCommand('selectAll', false, null); // Select all the content
                document.execCommand('delete'); // Delete the selected content
                data.setData('text/plain', text)
                LAST_ACTIVE_EL?.dispatchEvent(
                    new ClipboardEvent('paste', {
                        bubbles: true,
                        clipboardData: data,
                        cancelable: true,
                    }),
                )
                
            } else if (document.URL.indexOf("twitter.com") || document.URL.indexOf("notion.so") || document.URL.indexOf("web.whatsapp.com") || document.URL.indexOf("facebook.com") > -1){
                console.log(LAST_ACTIVE_EL.value);
                const data = new DataTransfer()
                data.setData('text/plain', '\n\n'+ text)
                LAST_ACTIVE_EL?.dispatchEvent(
                    new ClipboardEvent('paste', {
                        bubbles: true,
                        clipboardData: data,
                        cancelable: true,
                    }),
                )
                
            } else {
                LAST_ACTIVE_EL.innerHTML = res;
            }
          }
        } else {
          // if no active text area
          alert(`No active text input element`);
        }
};

const showError = (err) => {
    // const div = document.createElement('div');
    // div.style.padding = '10px';
    // div.innerText = 'Twoslash: ' + err;
    // div.style.color = '#ef4444';
    // LAST_ACTIVE_EL.appendChild(div);
    var errorTxt = 'TwoSlash: ' + err;
    alert(errorTxt);
}

const showLoadingCursor = () => {
    const style = document.createElement("style");
    style.id = "cursor_load";
    style.innerHTML = `* {cursor: wait;}`;
    document.head.insertBefore(style, null);
};
  
const restoreCursor = () => {
    document.getElementById("cursor_load").remove();
};

const getAllEditable = () => {
    return document.querySelectorAll("div[contenteditable=true]");
};

const handleClick = (e) => {
    if(document.URL.indexOf("checkout.stripe.com") > -1) {
        return;
    }
    console.log('HandleCLick')
    // If element is in editable parent, create button
    const editableDivs = getAllEditable();
    for (const div of editableDivs) {
        if (div.contains(e.target)) {
            LAST_ACTIVE_EL = div;
            
            break;
        }
    }
};

const checkCommand = () => {
    console.log("Yess 1");
    LAST_ACTIVE_EL = document.activeElement;
    etext = LAST_ACTIVE_EL.nodeName.toUpperCase() === "TEXTAREA" || LAST_ACTIVE_EL.nodeName.toUpperCase() === "INPUT" ? LAST_ACTIVE_EL.value : LAST_ACTIVE_EL.textContent;
    const etextRegex = /^.*(\/\/ai|\/\/email|\/\/explain|\/\/sheets|\/\/rewrite|\/\/spanish|\/\/french|\/\/hindi|\/\/answer|\/\/grammar|\/\/summarise|\/\/reply|\/\/pointers|\/\/code|\/\/codec|\/\/codepy|\/\/codej|\/\/codejs|\/\/coderu|\/\/codecp)\s.*?\/\/?$/;
    const actionMap = {
        "//ai": {
            action: text => {
            chrome.runtime.sendMessage({ text });
            },
            message: text => text.split("//ai")[1].replace(/\\/g, "").replace(/\/\//g, "")
        },
        "//email": {
            action: text => {
            chrome.runtime.sendMessage({ text });
            },
            message: text => `write an email reply for: "${text.split("//email ")[1].replace(/\\/g, "").replace(/\/\//g, "")}"`
        },
        "//explain": {
            action: text => {
            chrome.runtime.sendMessage({ text });
            },
            message: text => `explain about: "${text.split("//explain ")[1].replace(/\\/g, "").replace(/\/\//g, "")}"`
        },
        "//sheets": {
            action: text => {
            chrome.runtime.sendMessage({ text });
            },
            message: text => `give me the google sheets formula directly without any other text for: "${text.split("//sheets ")[1].replace(/\\/g, "")}"`
        },
        "//rewrite": {
            action: text => {
            chrome.runtime.sendMessage({ text });
            },
            message: text => `turn this sentence into clear and short sentence: "${text.split("//rewrite ")[1].replace(/\\/g, "").replace(/\/\//g, "")}"`
        },
        "//spanish": {
            action: text => {
            chrome.runtime.sendMessage({ text });
            },
            message: text => `translate this to spanish: "${text.split("//spanish ")[1].replace(/\\/g, "").replace(/\/\//g, "")}"`
        },
        "//french": {
            action: text => {
            chrome.runtime.sendMessage({ text });
            },
            message: text => `translate this to french: "${text.split("//french ")[1].replace(/\\/g, "").replace(/\/\//g, "")}"`
        },
        "//hindi": {
            action: text => {
            chrome.runtime.sendMessage({ text });
            },
            message: text => `translate this to hindi: "${text.split("//hindi ")[1].replace(/\\/g, "").replace(/\/\//g, "")}"`
        },
        "//answer": {
            action: text => {
            chrome.runtime.sendMessage({ text });
            },
            message: text => text.split("//answer ")[1].replace(/\\/g, "").replace(/\/\//g, "")
        },
        "//grammar": {
            action: text => {
            chrome.runtime.sendMessage({ text });
            },
            message: text => `fix the grammar mistakes: "${text.split("//grammar ")[1].replace(/\\/g, "").replace(/\/\//g, "")}"`
        },
        "//summarise": {
            action: text => {
            chrome.runtime.sendMessage({ text });
            },
            message: text => `summarise the following content: "${text.split("//summarise ")[1].replace(/\\/g, "").replace(/\/\//g, "")}"`
        },
        "//reply": {
            action: text => {
            chrome.runtime.sendMessage({ text });
            },
            message: text => `give a reply: "${text.split("//reply ")[1].replace(/\\/g, "").replace(/\/\//g, "")}"`
        },
        "//pointers": {
            action: text => {
            chrome.runtime.sendMessage({ text });
            },
            message: text => `write about the following description in short pointers: "${text.split("//pointers ")[1].replace(/\\/g, "").replace(/\/\//g, "")}"`
        },
        "//codec": {
            action: text => {
            chrome.runtime.sendMessage({ text });
            },
            message: text => `write the programming code C language for: "${text.split("//codec ")[1].replace(/\\/g, "").replace(/\/\//g, "")}"`
        },
        "//codepy": {
            action: text => {
            chrome.runtime.sendMessage({ text });
            },
            message: text => `write the programming code Python language for: "${text.split("//codepy ")[1].replace(/\\/g, "").replace(/\/\//g, "")}"`
        },
        "//codej": {
            action: text => {
            chrome.runtime.sendMessage({ text });
            },
            message: text => `write the programming code Java language for: "${text.split("//codej ")[1].replace(/\\/g, "").replace(/\/\//g, "")}"`
        },
        "//codejs": {
            action: text => {
            chrome.runtime.sendMessage({ text });
            },
            message: text => `write the programming code Javascript language for: "${text.split("//codejs ")[1].replace(/\\/g, "").replace(/\/\//g, "")}"`
        },
        "//coderu": {
            action: text => {
            chrome.runtime.sendMessage({ text });
            },
            message: text => `write the programming code Ruby language for: "${text.split("//coderu ")[1].replace(/\\/g, "").replace(/\/\//g, "")}"`
        },
        "//codecp": {
            action: text => {
            chrome.runtime.sendMessage({ text });
            },
            message: text => `write the programming code C++ language for: "${text.split("//codecp ")[1].replace(/\\/g, "").replace(/\/\//g, "")}"`
        },
    };

    if (etextRegex.test(etext)) {
        const [type, message] = etext.match(etextRegex)[1].split(":");
        const action = actionMap[type].action;
        const text = actionMap[type].message(etext);
        action(text);
        showLoadingCursor();
    }
}

var email, phoneno

const checkPaymentText = async () => {
    console.log("Yess");
    const { userid } = await chrome.storage.sync.get([ "userid" ]);

    const useridInp = document.querySelector("input[name='userid']");

    if(useridInp) {
        useridInp.value = userid;
        useridInp.disabled = true;
    }
    
    LAST_ACTIVE_EL = document.activeElement;
    const etext = LAST_ACTIVE_EL.nodeName.toUpperCase() === "BUTTON" ? LAST_ACTIVE_EL.innerHTML : '';
    console.log('Test');
    const etext2 = etext.toString();
    const email = document.querySelector("input[name='email']").value;
    const phone = document.querySelector("input[name='phone']").value;
    console.log(etext2, email, phone);

    if((etext2 === 'Pay <span style="margin-left: 4px;">₹ 20.00</span>' || etext2 === 'Pay <span style="margin-left: 4px;">₹ 30.00</span>') && email !== "" && phone !== ""){
        console.log('Yes')
        const url = `https://twoslash-backend.onrender.com/getPaymentStart?userid=${userid}&etext=${etext}&email=${email}&phone=${phone}`;
    
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
            if(json.statusCode === 400) {
                alert('There was an error processing the payment. Please make sure you have stable internet connection and try again after sometime');
                window.location.reload();
            }
        }
    }
}

const setUserid = async () => {
    console.log("setUserid");
}

let slashKeyPressed = false; // Variable to track if "/" key is pressed

const handleInput = (e) => {
    console.log(e.data)
    if (e.data === "/") {
        if (slashKeyPressed) {
          // "/" key is pressed twice
          checkCommand();
          // Reset slashKeyPressed to false for the next command
          slashKeyPressed = false;
        } else {
          // First press of the "/" key
          slashKeyPressed = true;
        }
      } else {
        slashKeyPressed = false; // Reset slashKeyPressed if any other key is pressed
      }
}

// for instagram only
const handleKeydown = (e) => {
    console.log(e.key);
    if (e.key === "/") {
        if (slashKeyPressed) {
          // "/" key is pressed twice
          checkCommand();
          // Reset slashKeyPressed to false for the next command
          slashKeyPressed = false;
        } else {
          // First press of the "/" key
          slashKeyPressed = true;
        }
      } else {
        slashKeyPressed = false; // Reset slashKeyPressed if any other key is pressed
      }
}
// for instagram only
const handlePayment = (e) => {
    checkPaymentText();
}

const handlePaymentClick = (e) => {
    checkPaymentText();
}
// Add event listeners
document.body.addEventListener("click", handleClick);
document.body.addEventListener("input", handleInput);
//event listener for Instagram
if (document.URL.indexOf("instagram.com") > -1) document.body.addEventListener("keydown", handleKeydown);
if (document.URL.indexOf("web.whatsapp.com") > -1) document.body.addEventListener("keydown", handleKeydown);
if (document.URL.indexOf("facebook.com") > -1) document.body.addEventListener("keydown", handleKeydown);
//if (document.URL.indexOf("pages.razorpay.com/pl_LeYvvdhQptmH7e/view") > -1) document.body.addEventListener("keydown", handlePayment);
if (document.URL.indexOf("pages.razorpay.com") > -1) document.body.addEventListener("click", handlePaymentClick);

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((request) => {
    if (request.generate) {
        if (request.generate.error) {
            console.log(request.generate.error)
            if(request.generate.error.message === "You didn't provide an API key. You need to provide your API key in an Authorization header using Bearer auth (i.e. Authorization: Bearer YOUR_KEY), or as the password field (with blank username) if you're accessing the API from your browser and are prompted for a username and password. You can obtain an API key from https://platform.openai.com/account/api-keys."){
                showError("The number of prompts you have used has exceeded the limit. Please subscribe to continue using the service.")
            }else {
                showError(request.generate.error.message)
                console.log(request.generate.error)
            }
        } else if (request.generate.text) {
            insertText(request.generate.text);
        }
        restoreCursor();
    }
});