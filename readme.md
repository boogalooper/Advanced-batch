# Advanced batch

The script allows to find and run an action suitable for an open document.

![](assets/20220316_231334_2022-03-16_23-05-11.png)

### Workspace preparation:

1. Download the script file, copy it to the Presets\Scripts\ folder of Photoshop.
2. If Photoshop was open, restart it. The script will appear in the menu File -> Scripts
3. Prepare your workspace - open the desired document and load the actions into the palette
4. The script is meant to be written to an action - create a new action and start recording. After that, just run the script from the menu (WARNING - do not use the action palette's "insert menu item" function to record a script call)

### Settings:

1. Decide which document should be associated with the action: active or any of the open onesdecide which document should be associated with the action: active or any of the open ones. Select the appropriate option
2. Select what will be used for matching with action name: the name of the document, the name of the directory from which the document is opened, the name of the selected layer in the document, the name of any layer from the document (with the ability to filter by label color)
3. Using the search direction inversion option, you can set the search algorithm: search for the action name in one of the document attributes, or vice versa, search for the selected document attribute in the action name
4. You can also specify from which part of the attribute name the search will start: from the beginning or from the end of the name
5. If you have many action sets loaded and some action names are repeated, you can limit your search to a specific set.

Click the "Test and Save Settings" button. You will see a message with the search result and a suggestion to write the settings to the action (if the settings are correct and the search was successful). If successful, an entry with the script call arguments will appear in the action palette. After that, the recording of the action can be stopped.

![](assets/20220316_213735_2022-03-16_19-13-55.png)

### Usage:

Use the created action to call the script and search for other actions according to the given parameters.
If necessary, you can adjust the parameters by double-clicking on the command to call the script.

### Compability:

Tested on Photoshop CC2014 and newer

### Video example:

[![](https://img.youtube.com/vi/3nb6p91QpNw/0.jpg)](https://youtu.be/3nb6p91QpNw)
[![](https://img.youtube.com/vi/BAbNqKvDjDE/0.jpg)](https://youtu.be/BAbNqKvDjDE)
